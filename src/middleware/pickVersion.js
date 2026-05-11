// // Only expose the `service` routes from v8.0
// const latestApiVersion = '8.0'

// // Helper that attempts to require a module and returns undefined if not found
// function safeRequire (path) {
//   try {
//     return require(path)
//   } catch (err) {
//     // Only swallow module not found errors; rethrow others
//     if (err && err.code === 'MODULE_NOT_FOUND') return undefined
//     throw err
//   }
// }

// // Require only the service routes from v8.0. If the folder is missing, safeRequire returns undefined.
// const serviceRoute = safeRequire(`../v${latestApiVersion}/routes/service`);
// const authenticationRoute = safeRequire(`../v${latestApiVersion}/routes/authentication`);

// module.exports = function (req, res, next) {
//   const apiPath = (req.baseUrl || '').split('/')[1]
//   try {
//     if (apiPath === 'service' && serviceRoute) {
//       res.locals.versionObject = serviceRoute
//     } else if (apiPath === 'authentication' && authenticationRoute) {
//       res.locals.versionObject = authenticationRoute
//     }
//     else {
//       // nothing to handle here for other api paths
//       res.locals.versionObject = () => { next() }
//     }
//     next()
//   } catch (ex) {
//     next(ex)
//   }
// }
// // 


// Versions
const latestApiVersion = '8.0'

/**
 * Safely require a module.
 * Returns undefined if the file/folder does not exist.
 */
function safeRequire (path) {
  try {
    return require(path)
  } catch (err) {
    if (err && err.code === 'MODULE_NOT_FOUND') return undefined
    throw err
  }
}

/* Require routes only for latest version */

// const authenticationLatest = safeRequire(`../v${latestApiVersion}/routes/ authentication`)
const authenticationLatest = safeRequire(`../v${latestApiVersion}/routes/authentication/index.js`)



console.log('authenticationLatest', authenticationLatest? 'found':'not found')


/* Tagged object for latest version routes */
const taggedRouteLatestObject = {
  //service: serviceLatest,
  authentication: authenticationLatest,
  
}

module.exports = function (req, res, next) {
  const apiPath = (req.baseUrl || '').split('/')[1]

  try {
    // Default result
    let taggedRouteObject = taggedRouteLatestObject

    // If path exists inside tagged object, attach version routes
    if (Object.prototype.hasOwnProperty.call(taggedRouteObject, apiPath)) {
      res.locals.versionObject = taggedRouteObject[apiPath]
    } else {
      // For routes not handled here
      res.locals.versionObject = () => { next() }
    }

    next()
  } catch (ex) {
    next(ex)
  }
}


