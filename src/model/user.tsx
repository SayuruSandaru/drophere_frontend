class User {
    static userDetail = null;

    static setUserDetail(userDetail, updateStateFunction = null) {
        this.userDetail = userDetail;
        localStorage.setItem('userDetail', JSON.stringify(userDetail));
        if (updateStateFunction) {
            updateStateFunction(userDetail);
        }
    }

    static getUserDetail() {
        if (!this.userDetail) {
            const storedUserDetail = localStorage.getItem('userDetail');
            if (storedUserDetail) {
                this.userDetail = JSON.parse(storedUserDetail);
            }
        }
        return this.userDetail;
    }

    static getUserId() {
        const userDetail = this.getUserDetail();
        return userDetail ? userDetail.user.id : null;
    }

    static getUserPhone() {
        const userDetail = this.getUserDetail();
        return userDetail ? userDetail.user.phone : null;
    }

    static getUserEmail() {
        const userDetail = this.getUserDetail();
        return userDetail ? userDetail.user.email : null;
    }

    static getUserName() {
        const userDetail = this.getUserDetail();
        return userDetail ? userDetail.user.username : null;
    }

    static getDriverDetails() {
        const userDetail = this.getUserDetail();
        return userDetail ? userDetail.driverDetails : null;
    }

    static isDriver() {
        const userDetail = this.getUserDetail();
        return userDetail ? userDetail.isDriver : false;
    }

    static getProfileImage() {
        const userDetail = this.getUserDetail();
        return userDetail ? userDetail.user.profile_image : null;
    }
}

export default User;
