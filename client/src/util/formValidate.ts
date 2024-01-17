/**
 * form validator
 * @param {string} name 
 * @param value 
 * @returns {string}
 */

const useValidate =  (name : string, value : unknown): string => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    switch(name){
        case 'email' : 
            if (!value) return "Email is required";
            else if (typeof value === 'string' && !value.match(regex)) return 'Not a valid email';
            break;
        case 'username' : 
            if (!value) return "Username is required";
            else if(typeof value === 'string' && value.length < 4) return 'Username must be 4 characters or more."';
            else if(typeof value === 'string' && value.indexOf(' ') >= 0) return "Whitespace not allowed"
            break;
        case 'password' :
                if(!value) return "password is required";
                else if(typeof value === 'string' && value.length < 6) return 'Password must be atleast 6 characters.';
                break;
        case 'bio' :
            if(typeof value === 'string' && value.length > 60) return "bio should be less than 100 characters"
    }
    return ''
} 

export default useValidate