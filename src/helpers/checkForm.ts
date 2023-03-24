interface ILoginData { password: string, username: string }
export const checkLogin = ( loginData: ILoginData ) => {
    if ( loginData.username.length === 0 ) return "El nombre de usuario es requerido";
    if ( loginData.password.length === 0 ) return "La contraseña es requerido";

    return "";
}