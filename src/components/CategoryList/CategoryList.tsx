import { Button, SimpleGrid } from '@chakra-ui/react'
import { FaBucket, FaComputer, FaSheetPlastic } from 'react-icons/fa6'
import { GiSteelClaws } from 'react-icons/gi'
import { RiCopperCoinLine } from 'react-icons/ri'
import { LiaDrumSteelpanSolid, LiaWineGlassSolid } from 'react-icons/lia'
import { FaBoxOpen, FaRegNewspaper } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const CategoryList = () => {
  const { t } = useTranslation()

  const iconSize = '2rem'
  const categories = [
    {
      icon: <FaComputer size={iconSize}/>,
      title: t('home.electronics')
    },
    {
      icon: <FaSheetPlastic size={iconSize}/>,
      title: t('home.plastic')
    },
    {
      icon: <GiSteelClaws size={iconSize}/>,
      title: t('home.steel')
    },
    {
      icon: <RiCopperCoinLine size={iconSize}/>,
      title: t('home.copper')
    },
    {
      icon: <LiaDrumSteelpanSolid size={iconSize}/>,
      title: t('home.aluminum')
    },
    {
      icon: <FaBucket size={iconSize}/>,
      title: t('home.buckets')
    },
    {
      icon: <LiaWineGlassSolid size={iconSize}/>,
      title: t('home.glass')
    },
    {
      icon: <FaRegNewspaper size={iconSize}/>,
      title: t('home.paper')
    },
    {
      icon: <FaBoxOpen size={iconSize}/>,
      title: t('home.boxes')
    }
  ]

  const navigate = useNavigate()

  /**
   * Redirects the user to the collect-places page with the given category.
   * @param title
   */
  function goToCategory(title: string) {
    navigate(`/collect-places/?tags=${title}`)
  }

  return <SimpleGrid columns={[2, 2, 3]} spacing='2rem' >
    {
      categories.map(({ title, icon }) => (
        <Button
          key={title}
          leftIcon={icon} p='2rem'
          onClick={() => goToCategory(title)}
        >
          {title}
        </Button>
      ))
    }
  </SimpleGrid>
}
