const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize(roles=[]) {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        
        jwt({ secret, algorithms: ['HS256'] }),

       
        async(req, res, next) => {
            const user = await db.User.findByPk(req.user.sub);
           
            if ((user.role=="Role.Admin") ) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
        


            
            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });

            req.user = user.get();
            next();
        }
    ];
}
