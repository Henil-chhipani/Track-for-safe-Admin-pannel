
const admin = require("firebase-admin");
const db = admin.database();
const refUser = db.ref("Users");

const userLocation = async (req, res, next) => {
    console.log('------------------------------------------------------------------');
    refUser.once('value', snapshot => {
        snapshot.forEach(userSnapshot => {
            const userData = userSnapshot.val();
            if (userData && userData.location) {
                const location = userData.location;
                console.log('User ID:', userSnapshot.key);
                console.log('User location:', location);
                console.log('------------------------------------------------------------------');
            }
        });
    }, error => {
        console.error('Error retrieving user location:', error);
    })
}

module.exports = userLocation;