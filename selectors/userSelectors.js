export const selectUser = (state) => state.user.user;
export const selectFamily = (state) => state.user.family;
export const selectMembers = (state) => state.user.family.members?.items;
export const selectEvents = (state) =>  state.user.family.members?.items.map(member => member.events?.items).flat();
