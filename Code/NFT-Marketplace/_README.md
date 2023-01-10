# NFT-Marketplace

Create next app
```shell
npx create-next-app nft-marketplace
```

Install dependencies
```shell
npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts ipfs-http-client axiosnpm install -d tailwindcss@latest postcss@latest autoprefixer@latest
```

Initialize tailwindcss
```shell
npx tailwindcss init -p
```

Initialize hardhat
```shell
npx hardhat
```

Add account to `.secret` file in the project root.

Run test
```shell
npx hardhat test
```

Run Frontend
```shell
npm run dev
```

Run test blockchain on local
```shell
npx hardhat node
```

Hardhat run scripts
```shell
npx hardhat run scripts/deploy.js --network localhost
```

### Setup secret keys
- Copy your private key to `.secret` file at the root of the project.
- Create an Infura project for `Polygon` network.
- Create an Infura project for `IPFS`.
- Place project ID and secrets in the environment file at the root of the project.

### Setup Project for Development

- Start node `npx hardhat node`.
- Deploy contracts `npx hardhat run scripts/deploy.js --network localhost`.
- Copy contract addresses and past it on `config.js` file.
- Get an account from the deployed test network and attach it to Metamask wallet.
- Run the Next.js app `npm run dev`.
- Open `http://localhost:3000` on your browser.
