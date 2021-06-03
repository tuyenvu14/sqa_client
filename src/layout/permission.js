const checkPermission = (permissions, userPermissions) => {
  const objPermissions = {};
  let canAccess = false;

  if (!permissions[0]) return true;
  if (!userPermissions) return false;

  permissions.forEach((permission) => {
    objPermissions[permission] = true;
  });

  userPermissions.forEach((permission) => {
    if (objPermissions[permission]) {
      canAccess = true;
    }
  });

  return canAccess;
};

export default checkPermission;
