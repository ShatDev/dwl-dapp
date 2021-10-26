import React, { useState } from "react"
import { OptionsContainer, WidthWrapper } from "../../../components/Layout"
import CustomInput from "../../../components/Input"
import { FaSearch } from "react-icons/fa"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import { InputAdornment } from "@mui/material"
import CustomSwitch from "../../../components/Switch"
import CustomTab from "../../../components/Tab"
import PopoverList, { componentElement } from "../../../components/Popover"
import { useWindowWidth } from "../../../hooks/useWindowWidth"

const PoolOptions: React.FC = () => {
    const [pools, setPools] = useState<string>("")
    const [stakeCheck, setStakeCheck] = useState<boolean>(false)
    const [tokenCheck, setTokenCheck] = useState<boolean>(false)
    const [poolStatus, setPoolStatus] = useState<number>(0)
    const windowWidth = useWindowWidth(600)

    const comp1 = <CustomSwitch
        checked={stakeCheck}
        onChange={e => setStakeCheck(e.target.checked)}
        labelText="Staked Only"
    />

    const comp2 = <CustomSwitch
        checked={tokenCheck}
        onChange={e => setTokenCheck(e.target.checked)}
        labelText="WNDR only"
    />

    const comp3 = <CustomTab
        value={poolStatus}
        onChange={(event, newValue) => setPoolStatus(newValue)}
        labelText={["Active", "Inactive"]}
        smbgcolor="#a2afad"
    />

    const componentArray: componentElement[] = [
        {
            id: "1",
            content: comp1,
        },
        {
            id: "2",
            content: comp2,
        },
        {
            id: "3",
            content: comp3,
        }
    ]

    return (
        <OptionsContainer>
            <WidthWrapper>
                <Grid container spacing={0}>
                    <Grid container item sm={12} md={4} justifyContent="center" alignItems="center">
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            flexGrow: 0.8
                        }}>
                            <CustomInput
                                value={pools}
                                onChange={(e) => setPools(e.target.value)}
                                placeholder="Search Farms"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FaSearch style={{ color: "#ffffff", width: "18px", height: "18px" }} />
                                    </InputAdornment>
                                }
                            />

                            {!windowWidth && <PopoverList componentArray={componentArray} />}
                        </Box>
                    </Grid>

                    <Grid container sm={12} md={8} item justifyContent="center" alignItems="center">
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            {windowWidth && comp1}
                            {windowWidth && comp2}
                            {windowWidth && comp3}
                        </Box>
                    </Grid>
                </Grid>
            </WidthWrapper>
        </OptionsContainer>
    )
}

export default PoolOptions