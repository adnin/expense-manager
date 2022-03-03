const ID_ROLES_KEY = 'EME_roles';

export const getRoles = () => {
    let roles = window.localStorage.getItem(ID_ROLES_KEY);
    return roles;
};

export const saveRoles = (roles) => {
    window.localStorage.setItem(ID_ROLES_KEY, JSON.stringify(roles));
};

export const destroyRoles = () => {
    window.localStorage.removeItem(ID_ROLES_KEY);
};

export default { getRoles, saveRoles, destroyRoles };
