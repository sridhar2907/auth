
const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize(authRole) {

    return [
        
        jwt({ secret, algorithms: ['HS256'] }),

       
        async(req, res, next) => {
            const user = await db.User.findByPk(req.user.sub);
            console.log(user)
            
            const role = await db.role_access.findByPk(user.role);
            console.log(role)
            
            if(authRole == 'getID') {
                if ((role.getbyid=="n") ) {

                    // user's role is not authorized
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            } else if (authRole == 'getall') {
                if ((role.getall=="n") ) {

                    // user's role is not authorized
                    return res.status(401).json({ message: 'Unauthorized' });
                   
                }
            }else if (authRole == 'deleteid') {
                if ((role.deleteall=="n") ) {

                    // user's role is not authorized
                    return res.status(401).json({ message: 'Unauthorized' });
                   
                }
            }else if (authRole == 'device') {
                if ((role.deviceinfo=="n") ) {

                    // user's role is not authorized
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            }else if (authRole == 'updatedevice') {
                if ((role.updatedevice=="n") ) {

                    // user's role is not authorized
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            }
            
            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });

            req.user = user.get();
            next();
        }
    ];
}
