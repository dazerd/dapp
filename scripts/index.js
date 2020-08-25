var accounts = [];
var activeWallet = "";

const setupConnection = () => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable().then((accs) => {
			// User has connected their wallet
			console.log(accs);
			alert('Connected Wallet');
			accounts = accs
			activeWallet = accounts[0];
			setupDApp();
		}).catch(er => {
			// Problem connecting to users wallet
			console.log(er);
		});
	} else {
		// Browser not supported
		alert('Browser not supported.');
	}
}

const setupDApp = () => {
	var html = `
		<h4>
			Linked Wallets:
		</h4>

		<ol>
	`;

	accounts.forEach(acc => {
		if(activeWallet == acc) {
			html += `<li><b>${acc}</b> - <i>Active Wallet</i></li>`;
		} else {
			html += `<li>${acc}</li>`;
		}
	});

	html += `
		</ol>
	`;

	document.querySelector('#acc-info').innerHTML = html;


	var depositForm = document.querySelector('#deposit-form');

	depositForm.addEventListener('submit', evt => {
		evt.preventDefault();

		var depositValue = depositForm['deposit-amount'].value;

		web3.eth.sendTransaction({
			from: activeWallet,
			to: privates.toAddress,
			value: web3.utils.toWei(depositValue, 'ether'),
		})
		.then(function(receipt){
			console.log("receipt: " + receipt);
		})
		.catch(er => {
			console.log("error: " + er);
		});
	});

	document.querySelector('#payment-area').style.display = 'block';
}