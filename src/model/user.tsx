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
        return this.userDetail.user.id;
    }

    static getUserEmail() {
        return this.userDetail.user.email;
    }

    static getDriverDetails() {
        return this.userDetail.driverDetails;
    }
}

export default User;
