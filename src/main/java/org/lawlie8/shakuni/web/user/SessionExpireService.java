package org.lawlie8.shakuni.web.user;

import org.lawlie8.shakuni.entity.User.Users;
import org.lawlie8.shakuni.security.config.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Service
public class SessionExpireService {

    @Autowired
    @Lazy
    private SessionRegistry sessionRegistry;

    private final static Logger log = LoggerFactory.getLogger(SessionExpireService.class);

    public void expireUserSessionByUserName(String userName){
        log.info("Session Expire Called");
        for (Object principal : sessionRegistry.getAllPrincipals()) {
            if (principal instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) principal;

                if (userDetails.getUsername().equals(userName)) {
                    for (SessionInformation information : sessionRegistry.getAllSessions(userDetails, true)) {
                        information.expireNow();
                    }
                }
            }
        }
    }
}