SELECT * FROM `flat_sell` 
LEFT JOIN `images_flat_sell` 
ON `flat_sell`.flat_id = `images_flat_sell`.flat_id 
AND `images_flat_sell`.status = 'main' 
WHERE `flat_sell`.rooms=3 
AND `flat_sell`.city='gomel'






SELECT *
FROM `flat_sell`
LEFT JOIN `images_flat_sell`
USING ( flat_id )
WHERE `flat_sell`.rooms =3
AND `flat_sell`.city = 'gomel'
AND `images_flat_sell`.status = 'main'
