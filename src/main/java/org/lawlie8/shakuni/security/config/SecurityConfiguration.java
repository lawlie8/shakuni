package org.lawlie8.shakuni.security.config;

import org.junit.jupiter.api.Order;
import org.lawlie8.shakuni.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.session.*;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.ArrayList;
import java.util.List;

import static org.lawlie8.shakuni.security.config.SecurityConstants.*;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepo userRepo;


    @Autowired
    LogOutSuccessHandler logOutSuccessHandler;

    @Bean
    public DaoAuthenticationProvider userDetailsService(CustomUserDetailService customUserDetailService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    @Order(1)
    public SecurityFilterChain mainFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.httpBasic((basic) -> basic.disable()).csrf((csrf) -> csrf.disable()).authorizeHttpRequests((auth) -> {
                    auth.requestMatchers(AntPathRequestMatcher.antMatcher("/app/**")).authenticated();
                    auth.requestMatchers(AntPathRequestMatcher.antMatcher("/web/**")).permitAll();
                    auth.requestMatchers(AntPathRequestMatcher.antMatcher("/**")).permitAll();

                })
                .rememberMe(rememberMe -> rememberMe.key(REMEMBER_ME_SECRET)
                        .tokenValiditySeconds(REMEMBER_ME_DURATION)
                        .rememberMeParameter(REMEMBER_ME_PARAMETER))
                .formLogin(httpSecurityFormLoginConfigurer -> {
                    httpSecurityFormLoginConfigurer
                            .loginPage("/web/security/logreq")
                            .successHandler(authenticationSuccessHandler())
                            .failureHandler(authenticationFailureHandler())
                            .loginProcessingUrl(LOGIN_PROCESSING_URL)
                            .usernameParameter(EMAIL_PARAMETER)
                            .passwordParameter(PASSWORD_PARAMETER)
                            .permitAll();
                }).logout((logout) -> logout.logoutUrl(LOGOUT_URL)
                        .logoutSuccessHandler(logOutSuccessHandler)
                        .deleteCookies(COOKIE_PARAM)
                        .permitAll())
                .build();
    }


    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler(){
        return new SuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new FailureHandler();
    }

    @Bean
    public SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        ConcurrentSessionControlAuthenticationStrategy concurrentSessionControlAuthenticationStrategy = new ConcurrentSessionControlAuthenticationStrategy(sessionRegistry());
        concurrentSessionControlAuthenticationStrategy.setMaximumSessions(-1);
        concurrentSessionControlAuthenticationStrategy.setExceptionIfMaximumExceeded(true);
        return concurrentSessionControlAuthenticationStrategy;
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

    @Bean
    public CompositeSessionAuthenticationStrategy concurrentSession() {
        ConcurrentSessionControlAuthenticationStrategy concurrentAuthenticationStrategy = new ConcurrentSessionControlAuthenticationStrategy(sessionRegistry());
        List<SessionAuthenticationStrategy> delegateStrategies = new ArrayList<SessionAuthenticationStrategy>();
        delegateStrategies.add(concurrentAuthenticationStrategy);
        delegateStrategies.add(new SessionFixationProtectionStrategy());
        delegateStrategies.add(new RegisterSessionAuthenticationStrategy(sessionRegistry()));
        return new CompositeSessionAuthenticationStrategy(delegateStrategies);
    }

    @Bean
    SessionInformationExpiredStrategy sessionInformationExpiredStrategy() {
        return new CustomSessionInformationExpiredStrategy("/");
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}

