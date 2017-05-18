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



SELECT * FROM `flats_rent`
LEFT JOIN `images_flat_sell`
ON `flats_rent`.obj_id = `images_flat_sell`.obj_id
AND `images_flat_sell`.status = 'main'
WHERE `flats_rent`.obj_rooms_num=1



SELECT arr.*, 
		img.obj_id AS im_obj_id, 
		img.user_id AS im_user_id,
		img.path AS im_path,
		img.status as im_status
FROM `flats_rent` AS arr
LEFT JOIN `images_flat_sell` AS img 
ON arr.obj_id = img.obj_id
AND img.status = 'main'
WHERE arr.obj_rooms_num=1




SELECT t.*, m.senderId, u.*
FROM threads AS t
CROSS JOIN messages AS m
LEFT JOIN users AS u ON u.id = m.SenderId
WHERE m.messageId = 5
