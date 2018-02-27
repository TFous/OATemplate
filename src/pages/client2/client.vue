
<template >
<div>
    <h3 class="pageTit">次席信息管理</h3>
    <div v-show="getAuth">
	    <xheaderBar
	        :options="options"
	        :headerFn="headerFn"
	        :addShow="addShow"
	        :delShow="false"
	        :isShowSenior="isShowSenior"
	    >
	     <template slot="seniorSearch">
	            <el-col :span="6">
	                <el-form-item label="次席名称">
	                    <el-select
	                        v-model="value1"
	                        multiple
	                        @visible-change="selectChange1"
	                        @remove-tag="selectChange1"
	                        style="margin-left: 20px;"
	                        placeholder="请选择">
	                        <el-option
	                            v-for="item in remoteListAll['SecondSeat']"
	                            :key="item.value"
	                            :label="item.text"
	                            :value="item.value">
	                        </el-option>
	                    </el-select>
	                </el-form-item>
	            </el-col>
	         <el-col :span="6">
	             <el-form-item label="次席状态">
	                 <el-select
	                     v-model="value2"
	                     multiple
	                     @visible-change="selectChange2"
	                     @remove-tag="selectChange2"
	                     style="margin-left: 20px;"
	                     placeholder="请选择">
	                     <el-option
	                         v-for="item in remoteListAll['SecondSeatStatus']"
	                         :key="item.value"
	                         :label="item.text"
	                         :value="item.value">
	                     </el-option>
	                 </el-select>
	             </el-form-item>
	         </el-col>
	        </template>

	    <slot name="addBtn">
	        <el-tooltip content="切换展开" placement="top-end">
	            <el-button plain type="success" @click="toggleRowExpansion">
	                切换展开
	            </el-button>
	        </el-tooltip>
	      <el-tooltip v-if="addAuth" content="新增" placement="top-end">
	        <el-button plain type="primary" @click="showClientModel()">
	          <i class="iconfont icon-add"></i>
	        </el-button>
	      </el-tooltip>
	    </slot>
	    </xheaderBar>

	    <xtable
	        :tableFn="tableFn"
	        :options="options"
	    >
	        <span slot="expand">
	            <el-table-column
	             fixed="left"
	             type="expand">
	                <template slot-scope="props">
	                    <el-table
	                        :data="props.row.ClientSecondSeat"
	                        style="width: 100%">
	                        <el-table-column
	                            label="次席名称"
	                            prop="SecondSeat">
	                        </el-table-column>
	                        <el-table-column
	                            label="次席状态"
	                            prop="SecondSeatStatus">
	                        </el-table-column>
	                        <el-table-column
	                            label="开始时间"
	                            prop="OpenTime">
	                        </el-table-column>
	                        <el-table-column
	                            label="结束时间"
	                            prop="CloseTime">
	                        </el-table-column>
	                    </el-table>
	                </template>
	            </el-table-column>
	        </span>
	    </xtable>
	    <xpagers
	        :options="options"
	    ></xpagers>
	    <!-- <xadd
	      :addFn="addFn"
	      :options="options"
	    ></xadd> -->
	    <xedit
	      :editFn="editFn"
	      :options="options"
	    ></xedit>
	    <!-- <xdetails
	        :options="options"
	    ></xdetails> -->

		<template>
			<el-dialog
			  title="新增 - 次席信息"
			  :visible.sync="clientVisible"
			  width="40%"
			  :close-on-click-modal="false"
			  :before-close="detailClose">
			  <el-form ref="clientForm"  :rules="clientRules" :model="clientForm" label-width="100px">
			  		<el-form-item label-width="0px">
				  		<el-col :span="12" class="p-r">
						  	<el-form-item label="客户号" prop="ClientNo">
						    	<el-input v-model="clientForm.ClientNo" placeholder="请输入六位数字的客户号"></el-input>
						  	</el-form-item>
					  	</el-col>
					  	<el-col :span="12" class="p-r">
					  		<el-form-item label="银期大额" prop="BankingfuturesWholesale">
						    	<el-input type="number"  v-model="clientForm.BankingfuturesWholesale"></el-input>
						  	</el-form-item>
					  	</el-col>
				  	</el-form-item>
				  	<el-form-item label="次席信息" class="cx-items">
					 <el-form-item
					    v-for="(secondSeat, index) in clientForm.ClientSecondSeat"
					    :key="secondSeat.key"
					  >
							<el-col :span="5" class="p-r">
								<el-form-item :prop="'ClientSecondSeat.' + index +'.SecondSeat'"
					    			:rules="{required: true, message: '名称不能为空', trigger: 'blur'}">
								    <el-select v-model="secondSeat.SecondSeat" placeholder="名称">
								      <el-option v-for="(secondSeatSystem, index) in SecondSeatSystemDict" :key="secondSeatSystem.Name" :label="secondSeatSystem.Name" :value="secondSeatSystem.Id"></el-option>
								    </el-select>
								</el-form-item>
							</el-col>
							<el-col :span="5" class="p-r">
								<el-form-item :prop="'ClientSecondSeat.' + index +'.SecondSeatStatus'"
					    			:rules="{required: true, message: '状态不能为空', trigger: 'blur'}">
								    <el-select v-model="secondSeat.SecondSeatStatus" placeholder="状态">
								      <el-option  v-for="(secondSeatStatus, index) in SecondSeatStatusDict" :key="secondSeatStatus.Name" :label="secondSeatStatus.Name" :value="secondSeatStatus.Id"></el-option>
								    </el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6" class="p-r">
						      <el-form-item>
						        <el-date-picker type="date" placeholder="开通日期" v-model="secondSeat.OpenTime" style="width: 100%;"></el-date-picker>
						      </el-form-item>
						    </el-col>
							<el-col :span="6" class="p-r">
						      <el-form-item>
						        <el-date-picker type="date" placeholder="结束日期" v-model="secondSeat.CloseTime" style="width: 100%;"></el-date-picker>
						      </el-form-item>
						    </el-col>
						    <el-col :span="2" v-if="index > 0">
						    	<el-button @click.prevent="removeSecondSeats(secondSeat)"><svg-icon icon-class="delete" /></el-button>
						    </el-col>
					  </el-form-item>
				  	</el-form-item>

				  	<el-form-item>
				  		<el-button @click="addSecondSeats()" size="mini"><svg-icon icon-class="plus" /></el-button>
				  	</el-form-item>
				  	<el-form-item label="双开客户"  prop="DoubleOpen">
					    <el-radio :label="true" v-model="clientForm.DoubleOpen">是</el-radio>
					    <el-radio :label="false" v-model="clientForm.DoubleOpen">否</el-radio>
					    <span class="p-l" >
					    	<svg-icon icon-class="info"></svg-icon>
					    	<span class="info">双开客户指主席和次席状态均为正常的客户，需手工设置</span>
					    </span>
				  	</el-form-item>
				  	<el-form-item label="期权">
				  		<el-checkbox v-model="clientForm.CommodityOption">商品期权</el-checkbox>
	  					<el-checkbox v-model="clientForm.FinancialOption">金融期权</el-checkbox>
				  	</el-form-item>
				  	<el-form-item label="备注" prop="Note">
				    	<el-input type="textarea" placeholder="输入50位以内的字符" v-model="clientForm.Note"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="handleSubmit('clientForm')">保存</el-button>
				    	<el-button @click="clientVisible = false">取消</el-button>
				  	</el-form-item>
				</el-form>
			</el-dialog>
		</template>
		<template>
			<el-dialog
			  :title="viewTitle"
			  :visible.sync="viewClientVisible"
			  :close-on-click-modal="false"
			  width="40%"
			  :before-close="viewDetailClose">
			  <el-form ref="viewClientForm"  :rules="clientRules" :model="viewClientForm" label-width="100px">
			  		<el-form-item label-width="0px">
				  		<el-col :span="12" class="p-r">
						  	<el-form-item label="客户号" prop="ClientNo">
						    	<el-input :disabled='true' v-model="viewClientForm.ClientNo"></el-input>
						  	</el-form-item>
					  	</el-col>
					  	<el-col :span="12" class="p-r">
					  		<el-form-item label="银期大额" prop="BankingfuturesWholesale">
						    	<el-input :disabled='isView' type="number" v-model="viewClientForm.BankingfuturesWholesale"></el-input>
						  	</el-form-item>
					  	</el-col>
				  	</el-form-item>
				  	<el-form-item label="次席信息" class="cx-items">
					 <el-form-item
					    v-for="(secondSeat, index) in viewClientForm.ClientSecondSeat"
					    :key="secondSeat.key"
					  >
							<el-col :span="5" class="p-r">
								<el-form-item :prop="'ClientSecondSeat.' + index +'.SecondSeat'"
					    			:rules="{required: true, message: '名称不能为空', trigger: 'blur'}">
								    <el-select :disabled='isView' v-model="secondSeat.SecondSeat" placeholder="名称">
								      <el-option v-for="(secondSeatSystem, index) in SecondSeatSystemDict" :key="secondSeatSystem.Name" :label="secondSeatSystem.Name" :value="secondSeatSystem.Id"></el-option>
								    </el-select>
								</el-form-item>
							</el-col>
							<el-col :span="5" class="p-r">
								<el-form-item :prop="'ClientSecondSeat.' + index +'.SecondSeatStatus'"
					    			:rules="{required: true, message: '状态不能为空', trigger: 'blur'}">
								    <el-select :disabled='isView' v-model="secondSeat.SecondSeatStatus" placeholder="状态">
								      <el-option  v-for="(secondSeatStatus, index) in SecondSeatStatusDict" :key="secondSeatStatus.Name" :label="secondSeatStatus.Name" :value="secondSeatStatus.Id"></el-option>
								    </el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6" class="p-r">
						      <el-form-item>
						        <el-date-picker :disabled='isView' type="date" placeholder="开通日期" v-model="secondSeat.OpenTime" style="width: 100%;"></el-date-picker>
						      </el-form-item>
						    </el-col>
							<el-col :span="6" class="p-r">
						      <el-form-item>
						        <el-date-picker :disabled='isView' type="date" placeholder="结束日期" v-model="secondSeat.CloseTime" style="width: 100%;"></el-date-picker>
						      </el-form-item>
						    </el-col>
						    <el-col  :span="2">
						    	<!-- 移除Id为空的 -->
						    	<el-button v-if="!secondSeat.Id" @click.prevent="removeSS(secondSeat)"><svg-icon icon-class="delete" /></el-button>
	   							<!-- 删除按钮 -->
						    	<el-button v-if="isDelete" type="danger" plain @click.prevent="deleteSecondSeats(secondSeat)"><svg-icon icon-class="delete" /></el-button>
						    </el-col>
					  </el-form-item>
				  	</el-form-item>
				  	<el-form-item v-if="!isView">
				  		<el-button @click="updateSecondSeats" size="mini"><svg-icon icon-class="plus" /></el-button>
				  	</el-form-item>
				  	<el-form-item label="双开客户"  prop="DoubleOpen">
					      <el-radio :label="true" :disabled='isView' v-model="viewClientForm.DoubleOpen">是</el-radio>
					      <el-radio :label="false" :disabled='isView' v-model="viewClientForm.DoubleOpen">否</el-radio>
					      <span class="p-l" >
					    	<svg-icon icon-class="info"></svg-icon>
					    	<span class="info">双开客户指主席和次席状态均为正常的客户，需手工设置</span>
					      </span>
					</el-form-item>
				  	<el-form-item label="期权">
				  		<el-checkbox :disabled='isView' v-model="viewClientForm.CommodityOption">商品期权</el-checkbox>
	  					<el-checkbox :disabled='isView' v-model="viewClientForm.FinancialOption">金融期权</el-checkbox>
				  	</el-form-item>
				  	<el-form-item label="备注" prop="Note">
				    	<el-input type="textarea" :disabled='isView' v-model="viewClientForm.Note"></el-input>
				  	</el-form-item>
				  	<el-form-item label="变更说明" prop="Description">
				    	<el-input v-model="viewClientForm.Description" :disabled='isView'></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button v-if="!isView&&editAuth" type="primary" @click="updateForm('viewClientForm')">{{btnText}}</el-button>
				    	<el-button type="danger"  v-if="isView&&isDelete" @click="deleteClient">删除客户</el-button>
				    	<el-button @click="viewClientVisible = false">关闭</el-button>
				  	</el-form-item>
				</el-form>
			</el-dialog>
		</template>
	</div>
	<div v-show="showErrorInfo" class="error-info">
      <p>Sorry，您无相关权限，快去联系管理员吧.....</p>
      <img src="./../app/img/error.png" />
  	</div>
</div>
</template>


<style src="./client.scss" lang="scss"></style>
<style src="./../app/common.scss" lang="scss" scoped></style>
