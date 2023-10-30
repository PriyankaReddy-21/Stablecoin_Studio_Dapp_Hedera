
console.clear();
require('dotenv').config();
const {
    Client,
    AccountId,
    PrivateKey,
    TokenAssociateTransaction,
} = require("@hashgraph/sdk");
//const fs = require("fs");

//Configure Accounts & Clients
const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const userId = AccountId.fromString(process.env.USER_ACCOUNT_ID);
const userKey = PrivateKey.fromString(process.env.USER_PRIVATE_KEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {

    // Add TokenId details to be associated
   const TokenId = "0.0.XXXXXXX";

    // Associate tokens to user
    var associateTx1 = await new TokenAssociateTransaction()
        .setAccountId(userId)
        .setTokenIds([TokenId])
        .freezeWith(client)
        .sign(userKey)
    var submitAssociateTx1 = await associateTx1.execute(client);
    var associateRx1 = await submitAssociateTx1.getReceipt(client);

    console.log('Associate tokens status :', associateRx1.status.toString(), "\n");

    // Associate tokens to admin
    var associateTx2 = await new TokenAssociateTransaction()
        .setAccountId(operatorId)
        .setTokenIds([TokenId])
        .freezeWith(client)
        .sign(operatorKey)
    var submitAssociateTx2 = await associateTx2.execute(client);
    var associateRx2 = await submitAssociateTx2.getReceipt(client);

    console.log('Associate tokens status :', associateRx2.status.toString(), "\n");

    console.log("Success!");
    client.close();
}

main();


