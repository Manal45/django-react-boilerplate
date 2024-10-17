import { User } from '../interfaces';

interface validateUserPermissionsParams {
  user: User
  permissions?: string[]
  roles?: string[]
}

export function validateUserPermissions({ user, permissions, roles }: validateUserPermissionsParams) {
  let hasAllPermissions = true;
  let hasAllRoles = true;

  if (permissions?.length) {
    const userPermissions = user?.permissions || [];

    hasAllPermissions = permissions.every(permission => {
      return userPermissions.includes(permission);
    });
  }

  // Check if user has all required roles by comparing role names with group names
  if (roles?.length) {
    const userRoles = user?.groups?.map(group => group.name) || [];

    hasAllRoles = roles.every(role => {
      return userRoles.includes(role);
    });
  }

  return { hasAllPermissions, hasAllRoles };
}
