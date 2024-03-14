import { v4 as uuidv4 } from 'uuid';

export function omit(obj, ...props) {
    const result = { ...obj };
    props.forEach((prop) => delete result[prop]);
    return result;
}

export function generateRandomString() {
    return uuidv4();
}
