const { PublicKey } = require("@solana/web3.js");
const { ENV, TokenListProvider } = require("@solana/spl-token-registry");

async function getTokenMetadata() {

    const mintAddress = new PublicKey("8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh");

    let tokenName;
    let tokenSymbol;
    let tokenLogo;

    const provider = await new TokenListProvider().resolve();
    const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();
    const tokenMap = tokenList.reduce((map, item) => {
        map.set(item.address, item);
        return map;
    }, new Map());

    const token = tokenMap.get(mintAddress.toBase58());
    if (token) {
        tokenName = token.name;
        tokenSymbol = token.symbol;
        tokenLogo = token.logoURI;

        console.log("Token Name:", tokenName);
        console.log("Token Symbol:", tokenSymbol);
        console.log("Token Logo:", tokenLogo);
    } else {
        console.log("Token not found in the token list.");
    }
}

getTokenMetadata();

