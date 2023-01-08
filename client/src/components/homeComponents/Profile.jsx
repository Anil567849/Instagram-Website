import React from 'react';
import Styles from './css/profile.module.css';

const Profile = () => {
  return (
    <div className={Styles.profileContainer}>
      {/* my profile  */}
      <div className={Styles.myProfileDiv}>
        <div className={Styles.myImgDiv}>
          <img src="/logo512.png" alt="" />
        </div>
        <div className={Styles.myNameDiv}>
          <p>Anil_kumar_10e9</p>
          <p>Anil kumar</p>
        </div>
      </div>
      {/* suggestion part  */}
      <div>
        <div className={Styles.suggestionTextDiv}>
          <p>Suggesstion For You</p>
          <p>See All</p>
        </div>
        <div>
          <div className={Styles.suggestionContainer}>
            <div className={Styles.suggestionProfileDiv}>
              <div className={Styles.suggestionImgDiv}>
                <img src="/logo512.png" alt="" />
              </div>
              <div className={Styles.suggestionNameDiv}>
                <p>Anil_kumar_10e9</p>
                <p>Followed by Anil kumar</p>
              </div>
            </div>
            <a href="#">Follow</a>
          </div>
          <div className={Styles.suggestionContainer}>
            <div className={Styles.suggestionProfileDiv}>
              <div className={Styles.suggestionImgDiv}>
                <img src="/logo512.png" alt="" />
              </div>
              <div className={Styles.suggestionNameDiv}>
                <p>Anil_kumar_10e9</p>
                <p>Followed by Anil kumar</p>
              </div>
            </div>
            <a href="#">Follow</a>
          </div>
          <div className={Styles.suggestionContainer}>
            <div className={Styles.suggestionProfileDiv}>
              <div className={Styles.suggestionImgDiv}>
                <img src="/logo512.png" alt="" />
              </div>
              <div className={Styles.suggestionNameDiv}>
                <p>Anil_kumar_10e9</p>
                <p>Followed by Anil kumar</p>
              </div>
            </div>
            <a href="#">Follow</a>
          </div>
          <div className={Styles.suggestionContainer}>
            <div className={Styles.suggestionProfileDiv}>
              <div className={Styles.suggestionImgDiv}>
                <img src="/logo512.png" alt="" />
              </div>
              <div className={Styles.suggestionNameDiv}>
                <p>Anil_kumar_10e9</p>
                <p>Followed by Anil kumar</p>
              </div>
            </div>
            <a href="#">Follow</a>
          </div>
          <div className={Styles.suggestionContainer}>
            <div className={Styles.suggestionProfileDiv}>
              <div className={Styles.suggestionImgDiv}>
                <img src="/logo512.png" alt="" />
              </div>
              <div className={Styles.suggestionNameDiv}>
                <p>Anil_kumar_10e9</p>
                <p>Followed by Anil kumar</p>
              </div>
            </div>
            <a href="#">Follow</a>
          </div>
          <div className={Styles.suggestionContainer}>
            <div className={Styles.suggestionProfileDiv}>
              <div className={Styles.suggestionImgDiv}>
                <img src="/logo512.png" alt="" />
              </div>
              <div className={Styles.suggestionNameDiv}>
                <p>Anil_kumar_10e9</p>
                <p>Followed by Anil kumar</p>
              </div>
            </div>
            <a href="#">Follow</a>
          </div>
        </div>
      </div>

      {/* links part  */}
      <div className={Styles.linksContainer}>
        <p>About Help Press API Jobs Privacy Terms Locations Language
            English</p>
        <p>© 2022 INSTAGRAM FROM META</p>
      </div>
    </div>
  )
}

export default Profile