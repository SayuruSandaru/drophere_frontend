import { UserModal } from "./userModal";

class User {
    static userDetail: UserModal;

    static setUserDetail(userDetail: UserModal, updateStateFunction = null) {
        this.userDetail = userDetail;
        if (updateStateFunction) {
            updateStateFunction(userDetail);
        }
    }

    static getUserDetail() {
        return this.userDetail;
    }

    static getUserId() {
        const user = localStorage.getItem('user');
        if (!user) return null;
        const userData = JSON.parse(user);
        return userData.id;
    }

    static setUserId(id: string) {
        const user = localStorage.setItem('user', id);
        return user;

    }

    static getUserEmail() {
        return this.userDetail.user.email;
    }

    static getDriverDetails() {
        return this.userDetail.driverDetails;
    }
}

export default User;
