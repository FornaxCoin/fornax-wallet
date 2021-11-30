import React from 'react';
// import { useEtherBalance, useEthers } from '@usedapp/core';
// import { formatEther } from '@ethersproject/units';

const ConnectWallet = () => {
  // const { activateBrowserWallet } = useEthers();
  // const etherBalance = useEtherBalance(account);
  return (
    <div>
      <div>
        {/* <button onClick={() => activateBrowserWallet()}>Connect</button> */}
      </div>
      {/* {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>} */}
    </div>
  );
};

export default ConnectWallet;
