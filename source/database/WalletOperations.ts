import {Sequelize} from "sequelize";

const modify_wallet = async (id: string, operation: string, amount: number, sequelize:Sequelize):  Promise<number> => {
    /* operations:
        add: adds to the users wallet
        subtract: removes from the users wallet
     */
    const wallets = sequelize.model("wallets");
    const [wallet] = await wallets.findOrCreate({
        where:{userId: id},
        defaults: {userId: id, wallet: 0}
    })
    switch (operation) {
        case "add":
            wallets.update({
                wallet: (wallet.get("wallet") as number + amount)
            },{
                where: {userId: id}
            })
            return (wallet.get("wallet") as number) + amount;
        case "subtract":
            if((wallet.get("wallet") as number) < amount) return 1_000_000_000;
            wallets.update({
                wallet: (wallet.get("wallet") as number - amount)
            },{
                where: {userId: id}
            })
            return 1_111_111_111;
        case "subtractWithBal":
            if((wallet.get("wallet") as number) < amount ){
                wallets.update({
                    wallet: 0
                },{
                    where: {userId: id}
                })
                return 0;
            }else{
                wallets.update({
                    wallet: ((wallet.get("wallet") as number) - amount)
                },{
                    where: {userId: id}
                })
                return (wallet.get("wallet") as number) - amount;
            }

    }

    return wallet.get("wallet") as number;
}

export default modify_wallet;