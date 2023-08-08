import { Certificate } from "@/types/Certificate.ts";

export const importPrivateKey = (pem: string) => {
	const pemHeader = "-----BEGIN PRIVATE KEY-----";
	const pemFooter = "-----END PRIVATE KEY-----";
	const pemContents = pem.substring(
		pemHeader.length,
		pem.length - pemFooter.length,
	);
	const binaryDerString = atob(pemContents);
	const binaryDer = str2ab(binaryDerString);

	return crypto.subtle.importKey(
		"pkcs8",
		binaryDer,
		{
			name: "RSASSA-PKCS1-v1_5",
			hash: "SHA-512"
		},
		false,
		["sign"]
	);
}

export const importPublicKey = (pem: string) => {
	const pemHeader = "-----BEGIN PUBLIC KEY-----";
	const pemFooter = "-----END PUBLIC KEY-----";
	const pemContents = pem.substring(
		pemHeader.length,
		pem.length - pemFooter.length,
	);

	const binaryDerString = atob(pemContents);
	const binaryDer = str2ab(binaryDerString);

	return crypto.subtle.importKey(
		"spki",
		binaryDer,
		{
			name: "RSASSA-PKCS1-v1_5",
			hash: "SHA-512"
		},
		false,
		["verify"]
	);
}

export const createCertificate = async (pem: string, url: string) => {
	const privateKey = await importPrivateKey(pem);
	
	const payload = {
		url,
		issuedAt: Date.now()
	};

	const cert = await crypto.subtle.sign(
		"RSASSA-PKCS1-v1_5",
		privateKey,
		new TextEncoder().encode(JSON.stringify(payload))
	);

	return {
		...payload,
		signature: btoa(String.fromCharCode(...new Uint8Array(cert)))
	} as Certificate;
}

export const verifyCertificate = async (pem: string, cert: Certificate) => {
	const publicKey = await importPublicKey(pem);
	
	const payload = {
		url: cert.url,
		issuedAt: cert.issuedAt
	};

	const signature = Uint8Array.from(atob(cert.signature), c => c.charCodeAt(0));

	const verified = await crypto.subtle.verify(
		"RSASSA-PKCS1-v1_5",
		publicKey,
		signature,
		new TextEncoder().encode(JSON.stringify(payload))
	);

	return verified;
}


function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
