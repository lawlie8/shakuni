package org.lawlie8.shakuni.security.config;


import org.lawlie8.shakuni.entity.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Component
public class CustomUserDetails implements UserDetails {

    private Users users;

    public CustomUserDetails(){

    }

    public CustomUserDetails(Users users) {
        super();
        this.users = users;

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
        for(int i=0;i<users.getPermissionsList().size();i++){
            SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(users.getPermissionsList().get(i).getPermissionName());
            simpleGrantedAuthorityList.add(simpleGrantedAuthority);
        }
        return simpleGrantedAuthorityList;
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
