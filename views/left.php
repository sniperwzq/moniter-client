<div id="bars" class="bars">
	<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	<ul class="nav nav-list nav-left-list">
		<?php foreach($_menu_two as $v):?>
			<li <?php if($_file == $v[2]):?>class="liselected" <?php endif;?>><a href="<?php echo $v[0];?>"><?php echo $v[1];?></a></li>
		<?php endforeach;?>
	</ul>
	</div>
</div>