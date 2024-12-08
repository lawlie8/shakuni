package org.lawlie8.shakuni.security.config;


import org.lawlie8.shakuni.entity.User.PermissionList;
import org.lawlie8.shakuni.entity.User.Users;
import org.lawlie8.shakuni.web.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class CustomUserDetails implements UserDetails {

    private Users users;

    private static final Logger log = LoggerFactory.getLogger(CustomUserDetails.class);

    @Autowired
    private UserService userService;

    public CustomUserDetails(){
    }

    public CustomUserDetails(Users users) {
        super();
        this.users = users;
    }

    public CustomUserDetails(Users users, UserService userService) {
        this.users = users;
        this.userService = userService;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    @Override
    public String toString() {
        return super.toString();
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> simpleGrantedAuthorityList = new ArrayList<>();
        List<PermissionList> permissionsList = userService.fetchPermissionByRoleList(users.getRole().getId());
        for(PermissionList permission : permissionsList){
            log.debug("Adding Permission to User "+ permission.getPermissionName());
            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("PER_"+permission.getPermissionName());
            simpleGrantedAuthorityList.add(simpleGrantedAuthority);
        }
        return simpleGrantedAuthorityList;
    }

    @Bean
    GrantedAuthorityDefaults grantedAuthorityDefaults() {
        return new GrantedAuthorityDefaults("PER");
    }

    @Override
    public String getPassword() {
        return users.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return users.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
