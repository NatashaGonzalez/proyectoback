import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getValidFilters = (filters, documentType) => {
    const cleanFilters = {};

    switch(documentType){
        case "videogame":{
            if(filters.gender){
                if(typeof gender === "string"){
                    cleanFilters["gender"] = {$in:[filters.gender]}
                }
                else {
                    cleanFilters["gender"] = {$in:filters.gender}
                }
            }
            if(filters.title){
                cleanFilters["title"] = {$in:[filters.title]}
            }
            if(filters.title){
                cleanFilters["title"] = filters.title
            }
            return cleanFilters;
        }
    }
}

export default __dirname;