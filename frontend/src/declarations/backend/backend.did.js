export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getImage' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'uploadImage' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
