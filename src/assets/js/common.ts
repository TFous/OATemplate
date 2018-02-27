/**
 * Created by wisdom on 2018/1/4.
 */
export function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str)
            if(str.indexOf('{')>-1){
                return true
            }else{
                return false
            }

        } catch(e) {
            return false
        }
    }
    return false
}