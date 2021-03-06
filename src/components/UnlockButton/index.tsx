import React, { useState } from "react"
import { ChainId } from "../../config";
import ConnectDialog from "../Dialog/ConnectDialog";
import { PrimaryButton, VariantButton, ErrorButton } from "../Button"
import { UnsupportedChainIdError } from "@web3-react/core";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useAuth from "../../hooks/useAuth";
import { ConnectorNames } from "../../utils/web3React"
import { BiPulse } from "react-icons/bi"

interface ButtonType {
    isVariant?: boolean,
    width?: string,
    minheight?: string
    textcolor?: string
}

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

const UnlockButton: React.FC<ButtonType> = ({ isVariant, width, minheight, textcolor }) => {
    const [open, setOpen] = useState(false)
    const { login } = useAuth()
    const { error } = useActiveWeb3React()

    let comp;

    if (error instanceof UnsupportedChainIdError) {
        comp = <ErrorButton width={width} minheight={minheight} onClick={() => login(ConnectorNames.Injected)}>
            <BiPulse />
            <span style={{ marginLeft: "5px" }}>Switch to {chainId === ChainId.MATIC || chainId === ChainId.MATIC_TESTNET ? "MATIC" : "ETH"}</span>
        </ErrorButton>
    } else {
        if (isVariant) {
            comp = <VariantButton width={width} minheight={minheight} style={{ margin: "0px" }} textcolor={textcolor} onClick={() => setOpen(true)} >Connect Wallet</VariantButton>
        } else {
            comp = <PrimaryButton width={width} minheight={minheight} onClick={() => setOpen(true)}>Connect Wallet</PrimaryButton>
        }
    }

    return (
        <>
            <div>
                {comp}
            </div>
            <ConnectDialog
                open={open}
                handleClose={() => setOpen(false)}
            />
        </>
    )
}

export default React.memo(UnlockButton)