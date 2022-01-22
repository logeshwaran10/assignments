import '../styles/style.scss';
import React, { useState } from 'react';
import { Layout, Card, Avatar, Button, Divider, Modal, Input, Spin, Typography } from 'antd';
import {
    VideoCameraFilled,
    FileImageFilled,
    SmileFilled,
    CloseOutlined
} from '@ant-design/icons';
import { GiphyFetch } from '@giphy/js-fetch-api';
import logo from '../assets/facebook-logo-2019.svg';
import homeIcon from '../assets/home.svg';
import groupIcon from '../assets/group.svg';
import liveIcon from '../assets/live-tv.svg';
import gameIcon from '../assets/facebook-gaming.svg';
import marketIcon from '../assets/marketplace.svg';
import messengerIcon from '../assets/facebook-messenger.svg';
import notificationIcon from '../assets/notification.svg';
import menuIcon from '../assets/menu.svg';
import accountIocn from '../assets/down-arrow.svg';
import moreIcon from '../assets/more-vert.svg';

const { Header, Content } = Layout;
const { Meta } = Card;
const gf = new GiphyFetch('UWKAAuSwBXr73cXPrAna6sPY5Z1Agtby');
const { Text } = Typography;
const postList=[{
    text: 'first post',
    media: "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
}];
function App() {
    const [visible, setVisible]= useState(false),
        [gifLoader, setGifLoader]= useState(false),
        [gif, setGif]= useState([]),
        [searchedGif, setSearchedGif]= useState([]),
        [selectedGif, SetSelectedGif]= useState([]),
        [searchModalVisible, SetSearchModalVisible]= useState(false),
        [value, setValue]= useState(''),
        [hasPost, setHasPost]= useState(false),
        [postText, setPostText]= useState(''),
        handleCancel = () => {
        setVisible(false);
        SetSelectedGif([]);
        },
        fetchGif = async () => {
        SetSearchModalVisible(true);
        setGifLoader(true);
        const response= await gf.trending({ offset:20, limit: 20 });
        setGif(response.data);
        setGifLoader(false);
        },
        searchGif = async (e) => {
        setValue(e.target.value);
        setGifLoader(true);
        const response = await gf.search(`${e.target.value}`, { offset: 20, limit: 20 });
        setSearchedGif(response.data);
        setGifLoader(false);
        },
        clickedGif = (event) => {
        SetSearchModalVisible(false);
        SetSelectedGif(event.target.src);
        setValue('');
        setSearchedGif([]);
        setHasPost(true);
        },
        cancelSearch = () => {
        setValue('');
        setSearchedGif([]);
        SetSearchModalVisible(false);
        },
        getPostText = (e) => {
            setHasPost(true);
            setPostText(e.target.value);
        },
        post = () => {
        SetSelectedGif([]);
        postList.push({
            text: postText,
            media: selectedGif
        });
        setHasPost(true);
        setVisible(false);
        };
    return (
        <Layout>
            <Header className="nav-header">
                <div>
                    <img className={'nav-icon'} src={logo} alt={'Logo'}/>
                </div>
                <div>
                    <img className={'nav-icon'} alt={'home'} src={homeIcon}/>
                    <img className={'nav-icon'} alt={'liveIcon'} src={liveIcon}/>
                    <img className={'nav-icon'} alt={'groupIcon'} src={groupIcon}/>
                    <img className={'nav-icon'} alt={'marketIcon'} src={marketIcon}/>
                    <img className={'nav-icon'} alt={'gameIcon'} src={gameIcon}/>
                </div>
                <div className={'account-profile'}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <img className={'nav-menuIcon'} alt={'menuIcon'} src={menuIcon}/>
                    <img className={'nav-menuIcon'} alt={'messengerIcon'} src={messengerIcon}/>
                    <img className={'nav-menuIcon'} alt={'notificationIcon'} src={notificationIcon}/>
                    <img className={'nav-menuIcon'} alt={'accountIcon'} src={accountIocn}/>
                </div>
            </Header>
            <Content  className={'site-layout '}>
                <div className={'user-story'}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://joeschmoe.io/api/v1/random" />}>
                            <span>
                                <svg height="10" width="10">
                                    <circle cx="22" cy="60" r="15" stroke="#fff" stroke-width="5" fill="#1876F2" />
                                    <text x="15" y="67" fill="#fff" font-size="22" font-weight = '600'>+</text>
                                </svg>
                            </span>
                            <Meta title="Create Story" />
                        </Card>
                        <Card hoverable>
                            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                        </Card>
                        <Card hoverable>
                            <img alt="example" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </Card>
                        <Card hoverable>
                            <img alt="example" src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
                        </Card>
                </div>
                <div className ={'content-post'}>
                <Card className={'post-card'}>
                    <div>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                        <Button className={'modal-button'} onClick={()=> setVisible(true)}> What's on your mind?</Button>
                    </div>
                    <Divider />
                    <div className={'upload-media'}>
                        <span>
                            <VideoCameraFilled />
                            <Text type="secondary"> Live Video</Text>
                        </span>
                        <span>
                            <FileImageFilled />
                            <Text type="secondary"> Photo/Video</Text>
                        </span>
                        <span>
                            <SmileFilled />
                            <Text type="secondary"> Feeling/Activity</Text>
                        </span>
                    </div>
                </Card>
                    <Modal
                        visible={visible}
                        title="Create Post"
                        className={'post-modal'}
                        closeIcon={<CloseOutlined />}
                        onCancel={handleCancel}
                        footer={false}
                    >
                        <div>
                            <div>
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                            </div>
                            <div>
                                <Input
                                    autoFocus={true}
                                    className={'input-field'}
                                    type='text'
                                    placeholder={'Type something here'}
                                    onChange={getPostText}
                                />
                            </div>
                            {
                                selectedGif.length ?
                                    <div>
                                       <img alt="Gif" className={'post-gif'} src={selectedGif}/>
                                   </div>
                                    :
                                    (
                                        ''
                                    )
                            }
                        </div>
                        <div className={'gif-button'}>
                            <Button type={'primary'} onClick={fetchGif}>Gif</Button>
                        </div>
                        <div className={'post-button'}>
                            <Button type={'primary'} onClick={post} disabled={!hasPost}>Post</Button>
                        </div>
                    </Modal>
                    
                    <Modal
                        visible={searchModalVisible}
                        title="Choose Gif"
                        className={'gif-modal'}
                        closeIcon={<CloseOutlined />}
                        onCancel={cancelSearch}
                        footer={false}
                    >
                        <div>
                            <div>
                                <Input
                                    className={'gif-search-bar'}
                                    autoFocus={true}
                                    type={'text'}
                                    placeholder={'Search'}
                                    onChange={searchGif}
                                    value={value}
                                />
                            </div>
                            <Divider/>
                            <div>
                                {gifLoader ?
                                    <div className="loader">
                                        <Spin/>
                                    </div>
                                    :
                                    <div className="images">
                                        {
                                            searchedGif.length ?
                                                searchedGif.map((gif, index) => (
                                                    <img
                                                        onClick={(key)=>clickedGif(key)}
                                                        key={index}
                                                        alt="Gif"
                                                        className={'gif'}
                                                        src={gif.images.fixed_height.url}
                                                    />
                                                ))
                                                :
                                                gif.map((gif, index) => (
                                                    <img
                                                        onClick={(key)=>clickedGif(key)}
                                                        key={index}
                                                        alt="Gif"
                                                        className={'gif'}
                                                        src={gif.images.fixed_height.url}
                                                    />
                                                ))
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </Modal>
                </div>
                <div>
                    { postList.map((post, index) =>(
                        <div className={'post'} >
                            <Card >
                                <div>
                                    <Avatar src="https://joeschmoe.io/api/v1/random"/>
                                    <img className={'more-icon'} alt={'moreIcon'} src={moreIcon}/>
                                </div>
                                <div>
                                    <Text>{post?.text}</Text>
                                </div>
                                <div>
                                    {post?.media?.length ?
                                        <img alt={'post'} src={post?.media}/>
                                        :
                                        (
                                            ''
                                        )
                                    }
                                </div>
                            </Card>
                        </div>
                    ))
                    }
                </div>
            </Content>
        </Layout>
    );
}

export default App;
