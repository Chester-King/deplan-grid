use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

fn latcheck(_lat : String) -> bool{
    
    let num: f64 = _lat.parse().unwrap();

    if num > 90.0 || num < -90.0{
        return false;
    }

    let numlen = _lat.chars().count();

    let dotchar = _lat.chars().nth(numlen-3).unwrap();

    if dotchar != '.'{
        return false;
    }

    return true;
}

fn longcheck(_long : String) -> bool{
    
    let num: f64 = _long.parse().unwrap();

    if num > 180.0 || num < -180.0{
        return false;
    }

    let numlen = _long.chars().count();

    let dotchar = _long.chars().nth(numlen-3).unwrap();

    if dotchar != '.'{
        return false;
    }

    return true;
}


#[program]
pub mod deplangrid {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn init_grid(ctx: Context<CreateGrid>, _lat : String, _long : String) -> Result<()>{
        
        let control_account = &mut ctx.accounts.control_account;

        require!(latcheck(_lat),CustomError::LatIssue);
        
        require!(longcheck(_long),CustomError::LongIssue);

        control_account.controlkey = ctx.accounts.user.to_account_info().key();
        control_account.bump = *ctx.bumps.get("control_account").unwrap();
        Ok(())
    }
}

#[error_code]
pub enum CustomError {
    LatIssue,
    LongIssue
}


#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
#[instruction(_lat : String, _long : String)]
pub struct CreateGrid<'info> {
    
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 1, seeds = [b"grid-controller".as_ref(),_lat.as_ref(),_long.as_ref()], bump
    )]
    pub control_account: Box<Account<'info, ControlAccount>>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>
}

#[account]
#[derive(Default)]
pub struct ControlAccount {
    controlkey: Pubkey,
    bump : u8
}