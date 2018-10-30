export class SecurityUtils{

    public static checkPermissions(permissions){
        var user= localStorage.getItem('fullUser');
        if(user){
            var userPermissions=JSON.parse(user).permissions;
            for(var i=0;i<userPermissions.length;i++){
                for(var j=0;j<permissions.length;j++){
                    if(userPermissions[i].name==permissions[j] || userPermissions[i].name=='admin')
                        return true;
                }

            }
            return false;
        }
        else{
            return false;
        }
    }
}