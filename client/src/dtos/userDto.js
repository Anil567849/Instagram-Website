// data transfer object = it is use to send clear data and relevent to somewhere

class UserDto{
    // myid;
    fullname;
    username;
    phone;
    avatar;
    activated;
    createdAt;

    constructor(user){
        // this.myid = user._id; you can change these variablr as well
        this._id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
        this.name = user.name;
        this.avatar = (user.avatar);
    }
}

module.exports = UserDto;