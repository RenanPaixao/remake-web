import { Button, SimpleGrid } from '@chakra-ui/react'
import { FaBucket, FaComputer, FaSheetPlastic } from 'react-icons/fa6'
import { GiSteelClaws } from 'react-icons/gi'
import { RiCopperCoinLine } from 'react-icons/ri'
import { LiaDrumSteelpanSolid, LiaWineGlassSolid } from 'react-icons/lia'
import { FaBoxOpen, FaRegNewspaper } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export const CategoryList = () => {
  const iconSize = '2rem'
  const categories = [
    {
      icon: <FaComputer size={iconSize}/>,
      title: 'Electronics'
    },
    {
      icon: <FaSheetPlastic size={iconSize}/>,
      title: 'Plastic'
    },
    {
      icon: <GiSteelClaws size={iconSize}/>,
      title: 'Steel'
    },
    {
      icon: <RiCopperCoinLine size={iconSize}/>,
      title: 'Copper'
    },
    {
      icon: <LiaDrumSteelpanSolid size={iconSize}/>,
      title: 'Aluminum'
    },
    {
      icon: <FaBucket size={iconSize}/>,
      title: 'Buckets'
    },
    {
      icon: <LiaWineGlassSolid size={iconSize}/>,
      title: 'Glass'
    },
    {
      icon: <FaRegNewspaper size={iconSize}/>,
      title: 'Paper'
    },
    {
      icon: <FaBoxOpen size={iconSize}/>,
      title: 'Boxes'
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
