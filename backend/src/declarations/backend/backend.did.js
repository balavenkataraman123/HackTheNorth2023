export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getImage' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Nat8)], ['query']),
    'uploadImage' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
