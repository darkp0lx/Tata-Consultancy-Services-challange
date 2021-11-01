import api from '@helpers/HttpsConnection.ts';

export interface iBodyRequest{
    documentType: string;
    documentNumber: string;
    birthDay: string;
    phoneNumber: number;
}

export interface iBodyResponse{
    direccion?:string;
    nomCompleto?:string;
    indCrearTercero?:string;
    estadoCivil?:string;
    tipoPersona?:string;
    telefono?:string;
    apellidoPaterno?:string;
    sexo?:string;
    indRequiereDireccion?:string;
    paisNacimiento?:string;
    nombres?:string;
    stsTercero?:string;
    tipoDocumento?:string;
    apellidoMaterno?:string;
    numDocumento?:string;
    fecNacimiento?:string;
    correo?:string;
}

export default {
    getUserInfo(body:iBodyRequest){
        return api.post('/obtenerdatospersona', body);
    }
}