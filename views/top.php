<div class="top_menu">
	<nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">监控系统</a>
            </div>
          <div id="navbar" class="navbar-collapse collapse">
		   <ul class="nav navbar-nav navbar-nav-top">
               <?php foreach($_menu_one as $v):?>
                   <li <?php if($_clss == $v[2]):?>class="active" <?php endif;?>><a href="<?php echo $v[0];?>"><?php echo $v[1]?></a></li>
               <?php endforeach;?>
           </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>
</div>

