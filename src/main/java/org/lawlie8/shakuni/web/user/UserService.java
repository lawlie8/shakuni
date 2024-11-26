package org.lawlie8.shakuni.web.user;

import org.lawlie8.shakuni.entity.Users;
import org.lawlie8.shakuni.repo.UserRepo;
import org.lawlie8.shakuni.web.user.util.UserInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;


    public List<UserInfoDTO> fetchAllUsers(){
        List<Users> usersList = userRepo.findAll();
        List<UserInfoDTO> userInfoDTOList = new ArrayList<>();
        for(Users user : usersList){
            UserInfoDTO userInfoDTO = new UserInfoDTO();
            userInfoDTO.setUserName(user.getUserName());
            userInfoDTO.setId(userInfoDTO.getId());
            //Create Column Creation_date for table users
            userInfoDTO.setCreationDate(new Date());
        }
        return null;
    }

}
