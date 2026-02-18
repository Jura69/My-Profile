import {
    Container,
    List,
    ListItem,
} from '@chakra-ui/react'
import { Title, Meta, AudioImage } from '../../../components/audiophile'
import P from '../../../components/paragraph'
import Layout from '../../../components/layouts/article'

const Audios = () => (
    <Layout title="Moondrop SSP">
        <Container>
            <Title>
                Moondrop SSP
            </Title>
            <P>
                Unlike some other IEMs on the market. MOONDROP implements acoustical damper and filter into one package in order to make precise control of frequency response.
            </P>
            <br />
            <AudioImage src="/images/audiophile/ssp-2.jpg" alt="SSP" />
            <List ml={4} my={4}>
                <ListItem>
                    <Meta>Diaphragm</Meta>
                    <span>Beryllium-Coated Dome + PU Suspension Ring</span>
                </ListItem>
                <ListItem>
                    <Meta>Sensitivity</Meta>
                    <span>112dB/Vrms@1kHz</span>
                </ListItem>
                <ListItem>
                    <Meta>Impedance</Meta>
                    <span>16Ω@1kHz</span>
                </ListItem>
                <ListItem>
                    <Meta>Headphone jack</Meta>
                    <span>0.78mm 2-pin</span>
                </ListItem>
                <ListItem>
                    <Meta>Frequency response</Meta>
                    <span>20-20000Hz (IEC60318-4)</span>
                </ListItem>
                <ListItem>
                    <Meta>THD</Meta>
                    <span>≤1% @1kHz</span>
                </ListItem>
                <ListItem>
                    <Meta>Housing Material</Meta>
                    <span>Amorphous Metal Alloy Housing</span>
                </ListItem>
                <ListItem>
                    <Meta>Coil</Meta>
                    <span>0.035mm-CCAW (Daikoku)</span>
                </ListItem>
                <ListItem>
                    <Meta>Magnet</Meta>
                    <span>N52-Neodymium High Density Magnetic Circuit</span>
                </ListItem>
                <ListItem>
                    <Meta>Acoustic Filter</Meta>
                    <span>Patented Anti-blocking Filter</span>
                </ListItem>
            </List>
        </Container>
    </Layout>
)

export default Audios
