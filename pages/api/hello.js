// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const snarkjs = require("snarkjs");
const fs = require("fs");



export default function handler(req, res) {
  console.log(' I am called')
  async function run() {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve({a: 10, b: 21}, "circuit.wasm", "circuit_final.zkey");

    console.log("Proof: ");
    console.log(JSON.stringify(proof, null, 1));

    const vKey = JSON.parse(fs.readFileSync("verification_key.json"));

    const result = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (result === true) {
        console.log("Verification OK");
        res.status(200).json({ answer: 'You are trusted!!!' })
    } else {
        console.log("Invalid proof");
        res.status(200).json({answer: 'not trusted sorry...'})
    }

}

  run().then(() => {
      //process.exit(0);
     
  });
 
}
