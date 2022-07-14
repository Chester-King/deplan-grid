import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Deplangrid } from "../target/types/deplangrid";
const {
  Connection,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
  SystemProgram
} = anchor.web3;

describe("deplangrid", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Deplangrid as Program<Deplangrid>;

  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  let lat;
  let long;
  let lat2;
  let long2;

  it("Is initialized!", async () => {
    // Add your test here.
    // const tx = await program.methods.initialize().rpc();
    // console.log("Your transaction signature", tx);
    
    lat = "89.5"
    long = "140.21"
    
    // 89.570 - 89.579 
    // 140.210 - 140.219    

    let controlPDA;
    let PDA_bump;
    [controlPDA, PDA_bump] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("grid-controller"),
        anchor.utils.bytes.utf8.encode(lat),
        anchor.utils.bytes.utf8.encode(long)
      ],
      program.programId
      );
    
    let controlPDA2;
    let PDA_bump2;

    lat2 = "20.20";
    long2 = "140.20";

    [controlPDA2, PDA_bump2] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("grid-controller"),
        anchor.utils.bytes.utf8.encode(lat2),
        anchor.utils.bytes.utf8.encode(long2)
      ],
      program.programId
      );
      
      await console.log(controlPDA.toBase58(),PDA_bump)
      
      const tx = await program
      .methods
      .initGrid(lat,long)
      .accounts({
        controlAccount : controlPDA,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .rpc();
      
      console.log("Your transaction signature", tx);

      let dt = await program.account.controlAccount.fetch(controlPDA);
      
      await console.log(provider.wallet.publicKey.toBase58() , "Signer");
      await console.log(dt.controlkey.toBase58(), "From Account")
      await console.log(dt.bump)

      try {
        
        let dt2 = await program.account.controlAccount.fetch(controlPDA2);
      } catch (error) {
        await console.log(error)
      }
      
  });

  it("Is initialized 2", async () => {
    // Add your test here.
    // const tx = await program.methods.initialize().rpc();
    // console.log("Your transaction signature", tx);
    
    lat = "89.57"
    long = "140.21"
    
    let controlPDA;
    let PDA_bump;
    [controlPDA, PDA_bump] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("grid-controller"),
        anchor.utils.bytes.utf8.encode(lat),
        anchor.utils.bytes.utf8.encode(long)
      ],
      program.programId
      );
    
    let controlPDA2;
    let PDA_bump2;

    lat2 = "20.20";
    long2 = "140.20";

    [controlPDA2, PDA_bump2] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("grid-controller"),
        anchor.utils.bytes.utf8.encode(lat2),
        anchor.utils.bytes.utf8.encode(long2)
      ],
      program.programId
      );
      
      await console.log(controlPDA.toBase58(),PDA_bump)
      
      const tx = await program
      .methods
      .initGrid(lat,long)
      .accounts({
        controlAccount : controlPDA,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .rpc();
      
      console.log("Your transaction signature", tx);

      let dt = await program.account.controlAccount.fetch(controlPDA);
      
      await console.log(provider.wallet.publicKey.toBase58() , "Signer");
      await console.log(dt.controlkey.toBase58(), "From Account")
      await console.log(dt.bump)

      try {
        
        let dt2 = await program.account.controlAccount.fetch(controlPDA2);
      } catch (error) {
        await console.log(error)
      }
      
  });
});
