import { Avatar } from "antd";
import { useLocation } from "react-router-dom";

export default function GlobalHeader(){

    const headerList = ['Jobs','Config',"Mangement"];

    function fetchUserAvatarImage(){
        
    }

    function navbarClick(item){
        console.log(item);
        
    }

    
    function userAvatarClick(){
        console.log(
            "Clicked Avatar"
        );
        
    }



    return (
     <div className="global-header" style={{display: useLocation().pathname === "/" ? 'none' : 'block' }}>
        <ul className="header-list">
            <li className="header-list-item-logo">
                <div className="header-logo" />
            </li>
            <li className="header-list-item">
                <ul className="header-list">
                    {
                        headerList.map((item)=>(
                            <li style={{paddingRight:'5px',paddingLeft:'5px'}} className="header-list-item" onClick={navbarClick(item)}>
                                <h3>{item}</h3>
                            </li>
    
                        ))
                    }
                </ul>
            </li>
            <li className="header-user-logo">
                <Avatar className="header-user-logo-avatar" src={{fetchUserAvatarImage}} size={35} style={{backgroundColor:'purple'}} onClick={userAvatarClick()}>U</Avatar>
            </li>
        </ul>

    </div>
     );

}