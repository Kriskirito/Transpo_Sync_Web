import { UserModel } from '../../../shared/models/user-model';

export const User_Default: UserModel = {
    iss: '', azp: '', aud: '', sub: '', email: '',
    email_verified: false, nbf: 0, name: '', picture: '',
    given_name: '', family_name: '', iat: 0, exp: 0, jti: ''
};

export const LOGIN_USER_KEY = 'loginUserModel';
