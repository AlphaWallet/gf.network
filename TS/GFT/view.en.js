//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
        this.setConfirm();
    }

    setConfirm() {
        window.onConfirm = function() {
            window.close();
        }
    }

    //TODO replace with actual contract
    populateTokenHolderTable() {
        let contractAddress = "";
        if(this.props.label === "GFO") {
            contractAddress = "0x1702f4210C4a7fE0b02c91Eb4Ad183B192c9099A";
        } else {
            contractAddress = "0xFf06Cc9F65bc35876CAb2bfAd4BBd23030D3856e";
        }
        let query = `https://api.bloxy.info/token/token_holders_list?token=${contractAddress}&key=ACCfS4FPxR0o2&format=table`;
        let xmlHttp = new XMLHttpRequest();
        let table = document.getElementById("tokenHolders");
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                let response = JSON.parse(xmlHttp.responseText);
                let index = 1;
                for (let data of response) {
                    let element = `
                        <td>${index++}</td>
                        <td>${data[0].substring(0, 12) + "..."}</td>
                        <td>${data[1].replace("Smart Contract", "SC")}</td>
                        <td>${data[2].toFixed(2)}</td>
                    `;
                    let child = document.createElement('tr');
                    child.innerHTML = element;
                    table.appendChild(child);
                }
            }
        };
        xmlHttp.open("GET", query, true);
        xmlHttp.send(null);
    }

    render() {
        return`
        <div>
            <table id="tokenHolders">
                <tr>
                    <th>Rank</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Quantity</th>
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
    token.populateTokenHolderTable();
};
//]]>
