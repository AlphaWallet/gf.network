//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
        this.setConfirm();
        this.props.whitelist = [this.props.whitelist]
    }

    setConfirm() {
        window.onConfirm = function() {
            window.close();
        }
    }

    populateWhitelistTable() {
        let table = document.getElementById("whitelisted");
        let index = 1;
        for (let address of this.props.whitelist) {
            let element = `
                <td>${index++}</td>
                <td>${address.substring(0, 25) + "..."}</td>
            `;
            let child = document.createElement('tr');
            child.innerHTML = element;
            table.appendChild(child);
        }
    }

    render() {
        return`
        <div>
            <table id="whitelisted">
                <tr>
                    <th>Order</th>
                    <th>Address</th>
                </tr>
            </table>
        </div>
`;
    }
}

web3.tokens.dataChanged = (oldTokens, updatedTokens, tokenIdCard) => {
    const currentTokenInstance = web3.tokens.data.currentInstance;
    let token =  new Token(currentTokenInstance);
    document.getElementById(tokenIdCard).innerHTML = token.render();
    token.populateWhitelistTable();
};
//]]>
