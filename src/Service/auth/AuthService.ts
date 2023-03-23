
import axios from "axios";
import { User } from "../../Interfaces.ts/AuthInterface";
import { URL_BASE } from '../../Config/Config'; 
export class AuthService {
 
   public static async login(body: User): Promise<any> {
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      axios.defaults.auth = { username: body.username, password: body.password };
      return axios.post(URL_BASE + '/public/login', body)

   }
}