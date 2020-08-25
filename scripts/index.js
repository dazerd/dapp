var accounts = [];

const setupConnection = () => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable().then((accs) => {
			// User has connected their wallet
			console.log(accs);
			alert('Connected Wallet');
			accounts = accs
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
		html += `<li><b>${acc}</b></li>`;
	});

	html += `
		</ol>
	`;

	document.querySelector('#acc-info').innerHTML = html;


	var depositForm = document.querySelector('#deposit-form');

	depositForm.addEventListener('submit', evt => {
		evt.preventDefault();

		alert(depositForm['deposit-amount'].value);
	});

	document.querySelector('#payment-area').style.display = 'block';
}