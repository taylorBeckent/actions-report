import React from 'react';
import styles from './index.module.css';

const BaguaChart = () => {
  // 天干
  const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  // 地支
  const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  // 八卦
  const bagua = ['乾', '坤', '震', '巽', '坎', '离', '艮', '兑'];

  return (
    <div className={styles.container}>
      <div className={styles.baguaChart}>
        {/* 中心太极 */}
        <div className={styles.taiji}>
          <div className={styles.yin}></div>
          <div className={styles.yang}></div>
        </div>
        
        {/* 八卦方位 */}
        {bagua.map((gua, index) => (
          <div 
            key={gua} 
            className={styles.baguaPosition}
            style={{
              transform: `rotate(${index * 45}deg) translateY(-150px)`
            }}
          >
            <span className={styles.baguaText}>{gua}</span>
          </div>
        ))}

        {/* 天干地支 */}
        <div className={styles.circle}>
          {tianGan.map((gan, index) => (
            <div 
              key={gan} 
              className={styles.tianGan}
              style={{
                transform: `rotate(${index * 36}deg) translateY(-120px)`
              }}
            >
              <span className={styles.text}>{gan}</span>
            </div>
          ))}
        </div>

        <div className={styles.circle}>
          {diZhi.map((zhi, index) => (
            <div 
              key={zhi} 
              className={styles.diZhi}
              style={{
                transform: `rotate(${index * 30}deg) translateY(-90px)`
              }}
            >
              <span className={styles.text}>{zhi}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BaguaChart; 